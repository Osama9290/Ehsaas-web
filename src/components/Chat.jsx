import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
//import { auth } from '../firebase';
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const Chat = () => {
  const history = useHistory();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /*
        if(!user){
            history.push('/not-found');
            return;
        }*/
    if (user) {
      axios
        .get("https://api.chatengine.io/users/me", {
          headers: {
            "project-id": "925d5c66-bd56-4aaa-8c04-c82c54a6e31b",
            "user-name": user.email,
            "user-secret": user.uid,
          },
        })
        .then(() => {
          setLoading(false);
        })
        .catch(() => {
          let formData = new FormData();
          formData.append("email", user.email);
          formData.append("username", user.email);
          formData.append("secret", user.uid);

          axios
            .post("https://api.chatengine.io/users", formData, {
              headers: {
                "private-key": "c8f1bad2-1460-4ed4-9d5d-a6f889ff43c7",
              },
            })
            .then(() => setLoading(false))
            .catch((error) => console.log(error));
        });
    }
  }, [user, history]);

  //if(!user || loading) return 'Loading...';

  return (
    <div>
      <ChatEngine
        height="calc(100vh - 66px)"
        projectID="925d5c66-bd56-4aaa-8c04-c82c54a6e31b"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chat;
