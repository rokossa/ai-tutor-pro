const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

class SympyService {
  static evaluateMath(studentAnswer, correctAnswer) {
    return new Promise((resolve) => {
      const scriptPath = path.join(__dirname, 'math_evaluator.py');
      
      // Smart Fallback: Check if the venv exists. If not, try system python.
      let pythonExecutable = 'python3'; 
      const venvPath = path.join(__dirname, '../venv/bin/python');
      if (fs.existsSync(venvPath)) {
        pythonExecutable = venvPath;
      }

      console.log(`🚀 Booting Math Engine using: ${pythonExecutable}`);

      const pythonProcess = spawn(pythonExecutable, [scriptPath, studentAnswer, correctAnswer]);
      let dataString = '';

      // THE FIX: Catch the exact error that was crashing the server!
      pythonProcess.on('error', (err) => {
        console.error("🔥 FATAL: Could not start Python process.", err);
        resolve({ 
            success: false, 
            error: `Python Startup Failed: ${err.message}. Is Python installed on this server?` 
        });
      });

      pythonProcess.stdout.on('data', (data) => {
        dataString += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error("SymPy Warning:", data.toString());
      });

      pythonProcess.on('close', (code) => {
        // If the process closed without outputting data (usually due to a crash)
        if (!dataString.trim()) {
            return resolve({ success: false, error: "Python script crashed without returning data." });
        }

        try {
          const result = JSON.parse(dataString);
          resolve(result);
        } catch (e) {
          console.error("Failed to parse SymPy output:", dataString);
          resolve({ success: false, error: `Invalid JSON from Python: ${dataString}` });
        }
      });
    });
  }
}

module.exports = SympyService;
