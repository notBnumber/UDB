const ws
function getWs(options) {
  console.log('对象');
  
  if (!ws) {
    ws = new WebSocket(options)
  }
  return ws
}
export default getWs