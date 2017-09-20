namespace Server
{
    public class EntityMessageRequest : WebSocketMessage
    {
        public readonly string SendByUserId;
        public readonly string MessageText;
        public EntityMessageRequest(string sendByUserId, string messageText)
        {
            SendByUserId = sendByUserId;
            MessageText = messageText;
            MessageType = "EntityMessageRequest";
        }
    }

    public class EntityMessageResponse : WebSocketMessage
    {
        public readonly string SendByUserId;
        public readonly string MessageText;
        public EntityMessageResponse(string sendByUserId, string messageText)
        {
            SendByUserId = sendByUserId;
            MessageText = messageText;
            MessageType = "EntityMessageResponse";
        }
    }
}