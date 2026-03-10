class SympyService {
  static evaluateMath(studentAnswer, correctAnswer) {
    return new Promise((resolve) => {
      try {
        console.log("🚀 Running Native JS Zero-Dependency Evaluator...");
        
        // 1. A robust normalizer that strips out all MathLive formatting quirks
        const normalize = (str) => {
          if (!str) return "";
          return str
            .replace(/\s+/g, '')                  // Remove spaces
            .replace(/\\cdot/g, '*')              // Convert LaTeX multiplication
            .replace(/\\times/g, '*')             
            .replace(/\\exponentialE/g, 'e')      // Convert MathLive 'e' variables
            .replace(/\\mathrm\{e\}/g, 'e')
            .replace(/\\mathit\{e\}/g, 'e')
            .replace(/\\left/g, '')               // Remove dynamic sizing brackets
            .replace(/\\right/g, '')
            .replace(/\\,/g, '')                  // Remove LaTeX spacing
            .replace(/~/g, '')
            .replace(/\\/g, '')                   // Strip remaining backslashes
            .replace(/\^\{([^}]+)\}/g, '^$1')     // Flatten exponents ^{3x} -> ^3x
            .toLowerCase();                       // Standardize casing
        };

        const cleanStudent = normalize(studentAnswer);
        const cleanCorrect = normalize(correctAnswer);

        console.log(`Debug: Comparing [${cleanStudent}] to [${cleanCorrect}]`);

        // 2. Direct string equivalence check
        const isEquivalent = cleanStudent === cleanCorrect;

        resolve({ 
            success: true, 
            is_equivalent: isEquivalent,
            debug: `Read as: ${cleanStudent}`
        });

      } catch (error) {
        console.error("🔥 Native JS Engine Failed:", error);
        resolve({ success: false, error: `Native Engine Crash: ${error.message}` });
      }
    });
  }
}

module.exports = SympyService;
