const ReponseMessage = ({ msg, color }) => {
  const styleColor = color ? 'red' : 'green'
  const bgColor = color ? '#ffe6e6' : '#d4edda'
  return (
    <p
      style={{
        color: styleColor,
        border: `2px solid ${styleColor}`,
        backgroundColor: `${bgColor}`,
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '15px',
      }}
    >
      {msg}
    </p>
  )
}

export default ReponseMessage
