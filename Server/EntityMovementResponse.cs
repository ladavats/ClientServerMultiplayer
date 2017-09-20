using System;
using System.Collections.Generic;

namespace Server
{
    [Serializable]
    public class EntityMovementResponse : WebSocketMessage
    {
        public IEnumerable<Entity> Entities { get; set; }

        public EntityMovementResponse(IEnumerable<Entity> entities)
        {
            Entities = entities;
            MessageType = WebSocketMessageTypes.EntityMovementResponse;
        }
    }
}