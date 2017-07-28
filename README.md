# Final Project - Job Tracker

# Requirements
The npm modules required for this project are as follows (all of which have been included in the node modules folder):
- npm 'body-parser'
- npm 'cheerio'
- npm 'express'
- npm 'mongoose'
- npm 'morgan'
- npm 'react'
- npm 'react-dom'
- npm 'request'
- npm 'babel'
- npm 'babel-loader'
- npm 'webpack'

Google Calander:
- npm install googleapis --save
- npm install google-auth-library --save

# Purpose:
The primary purpose of the job-tracker app is to provide small-businesses/contracters with an easy to use job-tracking platform that is linked with their google calanders.  The existing 'Jobber' app is cumbersome and not user friendly, it is difficult for the field technician to use and harder for the admin user to keep track of what is actually going on.  This app was designed to perform the most routine day to day tasks and consolidate them in an easy to use platform.

There are two primary types of accounts.  
1.  The direct user (underling)
2.  The admin user (boss)

# Usage:
These two users have access to different types of functions/data.

- Under the user paradigm the individual can view their calander for the week which has been updated from google calanders.  The different functions include adding a work repair order (with the quote price), adding a needed items list that will create a new spot on the calander for friday morning - blocking off time for the individual to go and get said items.  It also provides data items for tracking purposes such as a timelog for each job, which items were found/fixed, are future repairs required, is a follow up call required?  It will populate the google calanders for them and notify management of this.

- Under the admin paradigm the individual has all the same write access as the user but with some added features such as data collection/mining.  The admin has read/write access to the google calanders sections and 

# Future Development:
- Future development ideas include:
  Including a stopwatch for each job (saved to a database) for future analysis
  Including a invoice list that will print/email the invoice to the customer
  Including more data mining items for future analysis
  

# Author:
- Matt Triantafellu
- UCF Coding BootCamp Summer 2017

# Helpful topics:
- Python:  https://automatetheboringstuff.com/chapter0/
- Google Calanders:  https://developers.google.com/google-apps/calendar/quickstart/nodejs
- Jobber:  https://getjobber.com/?utm_source=google&utm_medium=cpc&utm_campaign=us_branded-ab_jobber-exact&utm_term=jobber

