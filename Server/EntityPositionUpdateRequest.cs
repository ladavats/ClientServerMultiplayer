namespace Server
{
    public class EntityPositionUpdateRequest : WebSocketMessage
    {
        public float X { get; set; }
        public float Y { get; set; }

        public EntityPositionUpdateRequest(float x, float y)
        {
            X = x;
            Y = y;
            MessageType = WebSocketMessageTypes.EntityPositionUpdateRequest;
        }
    }
}