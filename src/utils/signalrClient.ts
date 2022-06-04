/* eslint-disable @typescript-eslint/no-unsafe-call */
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

export interface ClientInfo {
  userName: string;
  connectionId: string;
}

// ------------------------------------------------------------------

type VisitFunction = (clientInfos: ClientInfo[]) => void;

type MessageFunction = (user: string, message: string) => void

type PreOfferFunction = (offerKey: string) => void;

type PreAnswerFunction = (offerKey: string, answer: boolean) => void;

type IceCandidateFunction = (offerKey: string, candidate: RTCIceCandidate) => void

type OfferFunction = (offerKey: string, offer: RTCSessionDescription) => Promise<void>

type AnswerFunction = (offerKey: string, answer: RTCSessionDescription) => void

// ------------------------------------------------------------------
export class SignalRClient {
  private readonly baseUrl = 'https://localhost:5000';
  private readonly url = `${this.baseUrl}/hub/project`;
  private readonly connection: HubConnection;

  onReceiveVisit: VisitFunction = () => console.warn('onReceiveVisit not implemented');
  onReceiveMessage: MessageFunction = () => console.warn('onReceiveMessage not implemented');
  onReceivePreOffer: PreOfferFunction = () => console.warn('onReceivePreOffer not implemented');
  onReceivePreAnswer: PreAnswerFunction = () => console.warn('onReceivePreAnswer not implemented');
  onReceiveIceCandidate: IceCandidateFunction = () => console.warn('onReceiveIceCandidate not implemented');
  onReceiveOffer: OfferFunction = async () => console.warn('onReceiveOffer not implemented');
  onReceiveAnswer: AnswerFunction = () => console.warn('onReceiveAnswer not implemented');

  constructor(token: string) {
    this.connection = new HubConnectionBuilder()
      .withUrl(this.url, { accessTokenFactory: () => token })
      .build();
  }

  isConnected() {
    return this.connection.state === HubConnectionState.Connected;
  }

  async stop() {
    await this.connection.stop();
  }

  async startUp() {
    await this.connection.start();
    if (!this.isConnected()) {
      return false;
    }

    this.connection.on('ReceiveVisit', (clientInfos: ClientInfo[]) => {
      this.onReceiveVisit(clientInfos);
    });

    this.connection.on('ReceiveMessage', (user: string, message: string) => {
      this.onReceiveMessage(user, message);
    });

    this.connection.on('receivePreOffer', (offerKey: string) => {
      this.onReceivePreOffer(offerKey);
    });

    this.connection.on('receivePreAnswer', (offerKey: string, answer: boolean) => {
      this.onReceivePreAnswer(offerKey, answer);
    });

    this.connection.on('ReceiveIceCandidate', (user: string, candidate: RTCIceCandidate) => {
      this.onReceiveIceCandidate(user, candidate);
    });

    this.connection.on('ReceiveOffer', (user: string, offer: string) => {
      const obj = JSON.parse(offer) as RTCSessionDescription;
      void this.onReceiveOffer(user, obj);
    });

    this.connection.on('ReceiveAnswer', (user: string, answer: string) => {
      const obj = JSON.parse(answer) as RTCSessionDescription;
      this.onReceiveAnswer(user, obj);
    });

    return true;
  }

  // ------------------------------------------------------------------

  sendVisit(houseId: string) {
    if (!this.isConnected()) {
      return console.error('not connected');
    }

    this.connection.invoke('SendVisit', houseId).catch(err => {
      return console.error(err.toString());
    });
  }

  sendObserve(houseId: number) {
    if (!this.isConnected()) {
      return console.error('not connected');
    }

    this.connection.invoke('SendObserve', houseId).catch(err => {
      return console.error(err.toString());
    });
  }

  sendMessage(user: string, msg: string) {
    if (!this.isConnected()) {
      return console.error('not connected');
    }

    this.connection.invoke('SendMessage', msg).catch(err => {
      return console.error(err.toString());
    });
  }

  sendIceCandidate(user: string, candidate: RTCIceCandidate) {
    if (!this.isConnected()) {
      return console.error('not connected');
    }

    this.connection.invoke('SendIceCandidate', user, JSON.stringify(candidate)).catch(err => {
      return console.error(err.toString());
    });
  }

  sendOffer(user: string, offer: RTCSessionDescription) {
    if (!this.isConnected()) {
      return console.error('not connected');
    }

    this.connection.invoke('SendVideoOffer', user, JSON.stringify(offer)).catch(err => {
      return console.error(err.toString());
    });
  }

  sendAnswer(user: string, answer: RTCSessionDescription) {
    if (!this.isConnected()) {
      return console.error('not connected');
    }

    this.connection.invoke('SendVideoOffer', user, JSON.stringify(answer)).catch(err => {
      return console.error(err.toString());
    });
  }
}
