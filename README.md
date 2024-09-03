1. Ensure you have Node.js version 22.4.0 installed.
2. Ensure you have React version 18.3.1 installed.
3. Run npm install in both the client and server directories to install the necessary dependencies.
4. In your Node.js project, replace the credentials in the .env file, such as the database name and database password.
5. Create the database specified in the .env file.
6. Navigate to the server folder and run npm run migrate:up to apply the database migrations.
7. In the server folder, run npm run seeder:up to seed the database.
8. Log in with your credentials. If the user exists, after login or signup, you will receive a JWT token. Set this token in the request headers to access any APIs.

# http://localhost:3000 (Frontend)
# http://localhost:5001/app (Server)

# questions APIs
# <h5>http://localhost:5001/app/questions (get)</h5>
# <h5>http://localhost:5001/app/questions (post)</h5>
# <h5>http://localhost:5001/app/questions/:id (put)</h5>
# <h5>http://localhost:5001/app/questions/:id (delete)</h5>


# Test series APIs
# <h5>http://localhost:5001/app/tests/start/:testId (get)</h5>
# <h5>http://localhost:5001/app/tests (post)</h5>
{
  name: '',
  total_marks: '',
  passing_marks: '',
  expiredDt: ''
}
# <h5>http://localhost:5001/app/tests/addQuestionToTest (post)</h5>
{
  test_series_id: '',
  question_id: ''
}
# <h5>http://localhost:5001/app/tests/getResultByUserId (post)</h5>
{
  user_id: '',
  test_id: ''
}
# <h5>http://localhost:5001/app/tests/allTestSeries (get)</h5>

# <h5>http://localhost:5001/app/tests/submitTest (post)</h5>
{
  user_id: '',
  test_id: '',
  data: []
}
