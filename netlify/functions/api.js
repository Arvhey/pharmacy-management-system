exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'PharmaCare API is running', timestamp: new Date().toISOString() }),
  }
}
