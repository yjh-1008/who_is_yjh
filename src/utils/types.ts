//메인화면 요약 카드 타입
export interface HomeContentType {
  readonly title: string;
  readonly content: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
export class Content {
  constructor(
    readonly title: string,
    readonly content: string,
    readonly createdAt?: Date | undefined,
    readonly updatedAt?: Date | undefined
  ) {
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
  }
}
