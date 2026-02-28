#!/bin/bash

echo "🚀 Preparing to deploy AI Tutor Pro to Render..."

# Check if there are actually changes to push
if [[ -z $(git status -s) ]]; then
  echo "✨ No new changes detected. Your Render deployment is already up to date!"
  exit 0
fi

# Use the first argument as the commit message, or default to a timestamp
COMMIT_MSG=$1
if [ -z "$COMMIT_MSG" ]; then
  COMMIT_MSG="chore: automated deployment update $(date +'%Y-%m-%d %H:%M:%S')"
fi

echo "📦 Staging all updated files..."
git add .

echo "✍️  Committing changes: '$COMMIT_MSG'"
git commit -m "$COMMIT_MSG"

echo "☁️  Pushing to GitHub (Triggering Render webhook)..."
git push origin main

echo "✅ Boom! Your code is on the way."
echo "🔗 Watch the live build here: https://dashboard.render.com/"
