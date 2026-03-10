import sys
import json
from sympy import simplify, expand
from sympy.parsing.latex import parse_latex

def sanitize_latex(latex_str):
    if not latex_str:
        return ""
        
    # Ultra-aggressive scrubbing of MathLive formatting tags
    replacements = [
        (r'\cdot', '*'),
        (r'\times', '*'),
        (r'\mleft', r'\left'),
        (r'\mright', r'\right'),
        (r'\left', ''),      # Strip all dynamic sizing
        (r'\right', ''),     
        (r'\exponentialE', 'e'),
        (r'\mathrm{e}', 'e'), # MathLive's default 'e'
        (r'\mathit{e}', 'e'),
        (r'\ ', ''),          # Strip weird spacing
        (r'~', ''),
        (r'\,', '')
    ]
    
    for old, new in replacements:
        latex_str = latex_str.replace(old, new)
        
    return latex_str

def evaluate():
    try:
        if len(sys.argv) < 3:
            return {"success": False, "error": "Missing arguments passed to Python."}

        student_raw = sys.argv[1]
        correct_raw = sys.argv[2]

        student_clean = sanitize_latex(student_raw)
        correct_clean = sanitize_latex(correct_raw)

        student_expr = parse_latex(student_clean)
        correct_expr = parse_latex(correct_clean)

        diff = simplify(student_expr - correct_expr)
        
        if diff != 0:
            diff = expand(student_expr - correct_expr)

        is_equiv = diff == 0

        return {
            "success": True,
            "is_equivalent": bool(is_equiv),
            "debug_clean_latex": student_clean
        }

    except Exception as e:
        return {
            "success": False,
            "is_equivalent": False,
            "error": f"SymPy Parse Error: {str(e)}"
        }

if __name__ == "__main__":
    result = evaluate()
    print(json.dumps(result))
