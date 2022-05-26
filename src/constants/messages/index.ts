export const message = {
  success: {
    insert: 'Row(s) inserted',
    update: 'Row(s) updated',
    user: {
      email: 'Details has been sent to your mail, if Exists.(Email - In development)',
      login: 'User Login Successful',
      password: 'User Password Updated',
      passwordReset: 'A reset password mail has been sent to your email if it exists in our system.',
    },
  },
  errors: {
    notFound: 'No data found',
    insert: 'No data inserted',
    employee: {
      email: 'Email address should be valid!',
      invalidEmployeeId: 'Invalid Employee Id',
      invalidUserPassword: 'Invalid username or password',
      passwordNotMatched: 'Current password not matched',
    },
    department: {
      invalidDepartId: 'Invalid Department Id',
    },
    project: {
      invalidProjectId: 'Invalid Project Id or code!',
    },
  },
}
