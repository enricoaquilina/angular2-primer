export class Message{
    constructor (
        public content: string, 
        public firstName?: string, 
        public messageId?: string, 
        public userId?: string) {};
}