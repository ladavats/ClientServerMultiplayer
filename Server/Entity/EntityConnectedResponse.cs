using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Server.Entity
{
    public class EntityConnectedResponse : WebSocketMessage
    {
        public float X { get; set; }
        public float Y { get; set; }
        public new string MessageType => this.GetType().ToString();
    }

    public class EntityClosedResponse : WebSocketMessage
    {
        public float X { get; set; }
        public float Y { get; set; }
        public new string MessageType => this.GetType().ToString();
    }
}