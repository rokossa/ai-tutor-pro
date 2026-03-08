const { spawn } = require('child_process');
const path = require('path');

class SympyService {
  static evaluateMath(studentAnswer, correctAnswer) {
    return new Promise((resolve, reject) => {
      const scriptPath = path.join(__dirname, 'math_evaluator.py');
      
      // Use the isolated virtual environment Python we built during deployment
      const pythonExecutable = path.join(__dirname, '../venv/bin/python');
      
      const pythonProcess = spawn(pythonExecutable, [scriptPath, studentAnswer, correctAnswer]);

      let dataString = '';
      
      pythonProcess.stdout.on('data', (data) => {
        dataString += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error("SymPy Warning/Error:", data.toString());
      });

      pythonProcess.on('close', (code) => {
        try {
          const result = JSON.parse(dataString);
          resolve(result);
        } catch (e) {
          console.error("Failed to parse SymPy output:", dataString);
          resolve({ success: false, error: "Parsing error" });
        }
      });
    });
  }
}

module.exports = SympyService;
