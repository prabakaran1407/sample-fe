import io, { type Socket } from "socket.io-client";
import { API_BASE_URL } from "../config/index";

import { useEffect } from "react";
import LocalStorageService from "./localStorage.service";

import { TNestedObj } from "../types/global.types";

class SocketService {
  socket!: Socket;
  AUTH!: TNestedObj;
  constructor() {
    this.socket = io(API_BASE_URL, { transports: ["websocket"] });
  }

  GET_USER_DATA() {
    return LocalStorageService.getItem("userData")
      ? JSON.parse(JSON.parse(LocalStorageService.getItem("userData") || ""))
      : {};
  }
  CONNECT_SOCKET() {
    // const _userData = this.GET_USER_DATA();

    useEffect(() => {
      this.socket.on("connect", () => {});
      this.socket.on("connect_error", (_error: any) => {});

      return () => {
        this.socket.disconnect();
      };
    }, []);
  }

  GET_SOCKET_INSTANCE() {
    return this.socket;
  }

  GET_SOCKET_ON_CB(eventName: string, cb: (data: any) => void) {
    const userData = this.GET_USER_DATA();

    this.socket.on(eventName, (data: Record<string, any> | TNestedObj) => {
      //   console.log("callback userData >>>>>>>>", userData);
      //   console.log("callback socket data >>>>>>>>", data);
      if (data?.organization_id === userData?.organization_id) {
        cb && cb(data);
      } else {
        return;
      }
    });
  }
}

export default new SocketService();
