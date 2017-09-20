using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI.WebControls.WebParts;
using Server.Entity;

namespace Server.Messaging
{
    public class ServerSystemMessageResponse : WebSocketMessage
    {
        public readonly string MessageText;
        public ServerSystemMessageResponse(string messageText)
        {
            MessageText = messageText;
            MessageType = "ServerSystemMessageResponse";
        }
    }
}