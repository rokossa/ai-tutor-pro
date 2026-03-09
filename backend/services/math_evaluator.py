import sys
import json
from sympy import simplify, expand
from sympy.parsing.latex import parse_latex

def sanitize_latex(latex_str):
    if not latex_str:
        return ""
        
    # Scrub out MathLive's special UI tags so SymPy doesn't crash
    replacements = [
        (r'\cdot', '*'),
        (r'\mleft', r'\left'),
        (r'\mright', r'\right'),
        (r'\exponentialE', 'e'),
        (r'\ ', ''),      # Remove weird spacing
        (r'\left(', '('), # Simplify brackets
        (r'\right)', ')')
    ]
    
    for old, new in replacements:
        latex_str = latex_str.replace(old, new)
        
    return latex_str

def evaluate():
    try:
        if len(sys.argv) < 3:
            return {"success": False, "error": "Missing arguments"}

        # 1. Grab the raw LaTeX from the Node.js server
        student_raw = sys.argv[1]
        correct_raw = sys.argv[2]

        # 2. Sanitize both strings
        student_clean = sanitize_latex(student_raw)
        correct_clean = sanitize_latex(correct_raw)

        # 3. Parse strings into SymPy math expressions
        student_expr = parse_latex(student_clean)
        correct_expr = parse_latex(correct_clean)

        # 4. Subtract them. If they are mathematically identical, the result is exactly 0.
        diff = simplify(student_expr - correct_expr)
        
        # Fallback: If simplify() doesn't catch it, try expand() (e.g. factored vs distributed)
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
            "error": str(e)
        }

if __name__ == "__main__":
    result = evaluate()
    print(json.dumps(result))
