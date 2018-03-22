#!/bin/bash

###
# Build and commit the common js files
###

CHANGED_JS_FILES=`git diff --cached --name-only --diff-filter=ACM`

# Bail out if there's nothing to build.
if [ $? != 0 ]; then
  exit 0
fi


npm run build && git add . && git status

if [ $? != 0 ]; then
  echo Fix build errors before committing
  exit 1
fi
