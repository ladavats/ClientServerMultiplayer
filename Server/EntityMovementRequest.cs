using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Server
{
    public class EntityMovementRequest : WebSocketMessage
    {
        public float Vx { get; set; } 
        public float Vy { get; set; }

        public EntityMovementRequest()
        {
            MessageType = "EntityMovementRequest";
        }
    }
}