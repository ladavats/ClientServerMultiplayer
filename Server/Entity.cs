using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Server
{
    public class WebSocketMessage
    {
        public string MessageType { get; set; }
        public string UserId { get; set; }

    }
    public class Entity : WebSocketMessage
    {
        public float X { get; set; }
        public float Y { get; set; }
        public string Color { get; set; }

        public Entity(string userId, float x, float y)
        {
            UserId = userId;
            X = x;
            Y = y;
            var rnd = new Random();
            Color = $"#{rnd.Next(0x1000000):X6}";
            MessageType = "Entity";
        }
    }
}