const ErrorMessage = ({ error }) => (
  <p
    style={{
      color: 'red',
      border: '2px solid red',
      backgroundColor: '#ffe6e6',
      padding: '10px',
      borderRadius: '5px',
      marginBottom: '15px',
    }}
  >
    {error}
  </p>
)

export default ErrorMessage
