using System;
using System.Collections.Generic;
using System.Linq;

namespace Server
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

    public class EntityPosition
    {
        public string UserId { get; set; }
        public float X { get; set; }
        public float Y { get; set; }
    }

    public class EntityRepository
    {
        public List<Entity> Entities { get; set; } = new List<Entity>();

        //Fix this so we only send the onec that has been updated.
        public IEnumerable<EntityPosition> GetUpdatedEntityPositions()
        {
            //return Entities.Where(o => o.HasMoved).Select(e=> new EntityPosition() { UserId =  e.UserId, X = e.X, Y = e.Y});
            return Entities.Select(e => new EntityPosition() { UserId = e.UserId, X = e.X, Y = e.Y });
        }

        public void Connect(Entity entity)
        {
            this.Entities.Add(entity);
        }

        public void Close(string userId)
        {
            Entities.Remove(Entities.First(o => o.UserId == userId));
        }

        public void UpdatePosition(EntityPositionUpdateRequest updateRequest)
        {
            var entity = Entities.First(o => o.UserId == updateRequest.UserId);
            entity.PreviousX = entity.X;
            entity.PreviousY = entity.Y;
            entity.X = updateRequest.X;
            entity.Y = updateRequest.Y;
        }
    }
}