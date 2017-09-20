using System;
using System.Collections.Generic;

namespace Server.Entity
{
    [Serializable]
    public class EntitiesPositionsResponse : WebSocketMessage
    {
        public IEnumerable<EntityPosition> EntityPositions { get; set; }

        public EntitiesPositionsResponse(IEnumerable<EntityPosition> entityPositions)
        {
            EntityPositions = entityPositions;
            MessageType = WebSocketMessageTypes.EntitiesPositionsResponse;
        }
    }
}