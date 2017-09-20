namespace Server
{
    public static class WebSocketMessageTypes
    {
        //Supported Types
        public const string EntityMovementRequest = "EntityMovementRequest";
        public const string EntityMessageRequest = "EntityMessageRequest";
        public const string EntityMessageResponse = "EntityMessageResponse";
        public const string EntityMovementResponse = "EntityMovementResponse";
        public const string WorldSnapShotResponse = "WorldSnapShotResponse";
        public const string EntitiesPositionsResponse = "EntitiesPositionsResponse";
        public const string EntityPositionUpdateRequest = "EntityPositionUpdateRequest";


    }
}