
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PaperclipIcon, Send, Smile, Phone, Video } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";

// Sample data
const conversations = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=2C7A7B&color=fff",
    lastMessage: "I've approved the site visit request",
    timestamp: "10:30 AM",
    unread: 2,
    online: true,
  },
  {
    id: "2",
    name: "Michael Brown",
    avatar: "https://ui-avatars.com/api/?name=Michael+Brown&background=ECC94B&color=1A365D",
    lastMessage: "Please review the sales forecast report",
    timestamp: "Yesterday",
    unread: 0,
    online: false,
  },
  {
    id: "3",
    name: "Golden Heights Team",
    avatar: "https://ui-avatars.com/api/?name=Golden+Heights&background=1A365D&color=fff",
    lastMessage: "Jennifer: Construction milestone completed",
    timestamp: "2 days ago",
    unread: 0,
    online: false,
    isGroup: true,
    members: 8,
  },
  {
    id: "4",
    name: "Emily Davis",
    avatar: "https://ui-avatars.com/api/?name=Emily+Davis&background=718096&color=fff",
    lastMessage: "The team lead meeting is scheduled for tomorrow",
    timestamp: "2 days ago",
    unread: 0,
    online: true,
  },
];

// Sample messages for first conversation
const messages = [
  {
    id: "1",
    sender: {
      id: "2",
      name: "Sarah Johnson",
      avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=2C7A7B&color=fff",
    },
    content: "Hi there! I've just reviewed the site visit request for Golden Heights Phase 2.",
    timestamp: "10:15 AM",
    read: true,
  },
  {
    id: "2",
    sender: {
      id: "2",
      name: "Sarah Johnson",
      avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=2C7A7B&color=fff",
    },
    content: "It looks good, and I've approved it. The client can visit tomorrow at 10:00 AM.",
    timestamp: "10:16 AM",
    read: true,
  },
  {
    id: "3",
    sender: {
      id: "1",
      name: "Current User",
      avatar: "",
    },
    content: "That's great! Thank you for the quick approval.",
    timestamp: "10:20 AM",
    read: true,
  },
  {
    id: "4",
    sender: {
      id: "1",
      name: "Current User",
      avatar: "",
    },
    content: "I'll inform the client right away and make sure everything is arranged for the visit.",
    timestamp: "10:21 AM",
    read: true,
  },
  {
    id: "5",
    sender: {
      id: "2",
      name: "Sarah Johnson",
      avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=2C7A7B&color=fff",
    },
    content: "Perfect. I've also allocated Car #2 for the visit. Make sure to document the visit with photos for our records.",
    timestamp: "10:25 AM",
    read: true,
  },
  {
    id: "6",
    sender: {
      id: "2",
      name: "Sarah Johnson",
      avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=2C7A7B&color=fff",
    },
    content: "And please submit the visit report by end of day tomorrow.",
    timestamp: "10:30 AM",
    read: false,
  },
];

const ChatInterface = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("direct");
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageInput, setMessageInput] = useState("");
  const [activeConversations, setActiveConversations] = useState(conversations);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    
    // In a real app, this would send the message to the backend
    // For now, just clear the input
    setMessageInput("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 h-[calc(100vh-10rem)] gap-4">
      {/* Conversations sidebar */}
      <Card className="lg:col-span-1 overflow-hidden">
        <CardHeader className="p-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Messages</CardTitle>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="direct">Direct</TabsTrigger>
                <TabsTrigger value="groups">Groups</TabsTrigger>
              </TabsList>
              <TabsContent value="direct" className="m-0">
                <ScrollArea className="h-[calc(100vh-15rem)]">
                  {activeConversations
                    .filter(c => !c.isGroup)
                    .map((conversation) => (
                      <div
                        key={conversation.id}
                        className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-muted transition-colors ${
                          selectedConversation.id === conversation.id ? "bg-muted" : ""
                        }`}
                        onClick={() => setSelectedConversation(conversation)}
                      >
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={conversation.avatar} />
                            <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {conversation.online && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-estate-success rounded-full border-2 border-background"></span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <p className="font-medium truncate">{conversation.name}</p>
                            <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                        </div>
                        {conversation.unread > 0 && (
                          <Badge className="bg-estate-navy h-5 w-5 flex items-center justify-center rounded-full p-0">
                            {conversation.unread}
                          </Badge>
                        )}
                      </div>
                    ))}
                </ScrollArea>
              </TabsContent>
              <TabsContent value="groups" className="m-0">
                <ScrollArea className="h-[calc(100vh-15rem)]">
                  {activeConversations
                    .filter(c => c.isGroup)
                    .map((conversation) => (
                      <div
                        key={conversation.id}
                        className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-muted transition-colors ${
                          selectedConversation.id === conversation.id ? "bg-muted" : ""
                        }`}
                        onClick={() => setSelectedConversation(conversation)}
                      >
                        <Avatar>
                          <AvatarImage src={conversation.avatar} />
                          <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <p className="font-medium truncate">{conversation.name}</p>
                              <Badge variant="outline" className="ml-2 text-xs">
                                {conversation.members}
                              </Badge>
                            </div>
                            <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                        </div>
                        {conversation.unread > 0 && (
                          <Badge className="bg-estate-navy h-5 w-5 flex items-center justify-center rounded-full p-0">
                            {conversation.unread}
                          </Badge>
                        )}
                      </div>
                    ))}
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {/* The TabsContent elements have been moved inside the Tabs component */}
        </CardContent>
      </Card>

      {/* Chat area */}
      <Card className="lg:col-span-3 flex flex-col">
        <CardHeader className="border-b p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={selectedConversation.avatar} />
                <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{selectedConversation.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {selectedConversation.online ? "Online" : "Offline"}
                  {selectedConversation.isGroup && ` • ${selectedConversation.members} members`}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-4 overflow-auto flex flex-col">
          <ScrollArea className="flex-1">
            <div className="space-y-4">
              {messages.map((message) => {
                const isOwnMessage = message.sender.id !== selectedConversation.id;
                return (
                  <div
                    key={message.id}
                    className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
                  >
                    <div className="flex gap-2 max-w-[70%]">
                      {!isOwnMessage && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={message.sender.avatar} />
                          <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      )}
                      <div>
                        <div
                          className={`rounded-lg p-3 ${
                            isOwnMessage
                              ? "bg-estate-navy text-white"
                              : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <div className="flex items-center mt-1 space-x-2">
                          <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                          {isOwnMessage && (
                            <span className="text-xs text-muted-foreground">
                              {message.read ? "Read" : "Delivered"}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <PaperclipIcon className="h-4 w-4" />
            </Button>
            <Input
              placeholder="Type a message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="flex-1"
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button variant="ghost" size="icon">
              <Smile className="h-4 w-4" />
            </Button>
            <Button
              onClick={handleSendMessage}
              className="bg-estate-navy hover:bg-estate-navy/90"
              disabled={!messageInput.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChatInterface;
