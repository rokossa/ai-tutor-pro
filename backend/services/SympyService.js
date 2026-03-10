// We are keeping the class name "SympyService" so we don't have to rewrite your Controllers,
// but under the hood, this is now a 100% pure JavaScript evaluation engine!
const { ComputeEngine } = require('@cortex-js/compute-engine');

class SympyService {
  static evaluateMath(studentAnswer, correctAnswer) {
    return new Promise((resolve) => {
      try {
        console.log("🚀 Booting lightweight JS Compute Engine...");
        
        // Initialize the engine
        const ce = new ComputeEngine();
        
        // Parse the raw LaTeX from MathLive into MathJSON expressions
        // CortexJS perfectly understands MathLive's output without needing a custom sanitizer!
        const studentExpr = ce.parse(studentAnswer);
        const correctExpr = ce.parse(correctAnswer);

        // isEqual checks true mathematical equivalence (e.g., x+x == 2x)
        // rather than just structural string matching
        const isEquivalent = studentExpr.isEqual(correctExpr);

        resolve({ 
            success: true, 
            is_equivalent: isEquivalent 
        });

      } catch (error) {
        console.error("🔥 JS Compute Engine Failed:", error);
        resolve({ 
            success: false, 
            error: `JS Compute Engine Error: ${error.message}` 
        });
      }
    });
  }
}

module.exports = SympyService;
