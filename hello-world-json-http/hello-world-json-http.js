var http = require('http');

var app = http.createServer(function(req,res){
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(
      [{"cat":"renderer_host","pid":21253,"tid":21253,"ts":438877867947,"ph":"B","name":"RenderWidgetHost::OnMsgUpdateRect","args":{}},
      {"cat":"renderer_host","pid":21253,"tid":21253,"ts":438877868947,"ph":"E","name":"RenderWidgetHost::OnMsgUpdateRect","args":{}}]
    ));
    // res.sendFile(__dirname + '/big_trace.json');
    // res.end(JSON.stringify(__dirname + '/big_trace.json'));
});
app.listen(3000);

console.log('lintening on localhost:3000');
