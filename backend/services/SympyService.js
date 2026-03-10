const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

class SympyService {
  static evaluateMath(studentAnswer, correctAnswer) {
    return new Promise((resolve) => {
      try {
        const scriptPath = path.join(__dirname, 'math_evaluator.py');
        
        let pythonExecutable = 'python3'; 
        const venvPath = path.join(__dirname, '../venv/bin/python');
        if (fs.existsSync(venvPath)) {
          pythonExecutable = venvPath;
        }

        // 💡 THE FIX: Prevent Python from writing __pycache__ files to avoid auto-restart loops!
        const env = { ...process.env, PYTHONDONTWRITEBYTECODE: '1' };

        const pythonProcess = spawn(pythonExecutable, [scriptPath, studentAnswer || '', correctAnswer || ''], { env });

        // Catch synchronous spawn failures
        if (!pythonProcess || !pythonProcess.stdout) {
          return resolve({ success: false, error: "Failed to allocate stdout. Server memory might be full." });
        }

        let dataString = '';

        pythonProcess.on('error', (err) => {
          resolve({ success: false, error: `Python Spawn Error: ${err.message}` });
        });

        pythonProcess.stdout.on('data', (data) => {
          dataString += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
          console.error("SymPy Warning:", data.toString());
        });

        pythonProcess.on('close', (code) => {
          if (!dataString.trim()) {
              return resolve({ success: false, error: `Python crashed (exit code ${code}) without returning data. Likely an Out-Of-Memory (OOM) kill.` });
          }
          try {
            resolve(JSON.parse(dataString));
          } catch (e) {
            resolve({ success: false, error: `Python returned invalid JSON: ${dataString}` });
          }
        });
        
      } catch (globalErr) {
        // Catch absolutely any Node.js logic crash
        resolve({ success: false, error: `Node.js Fatal Crash: ${globalErr.message}` });
      }
    });
  }
}

module.exports = SympyService;
