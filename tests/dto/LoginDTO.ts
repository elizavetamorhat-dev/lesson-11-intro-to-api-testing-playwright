export class LoginDTO {
  private readonly username: string
  private readonly password: string

  private constructor(username: string, password: string) {
    this.username = username
    this.password = password
  }

  static createLoginWithCorrectData(): LoginDTO {
    return new LoginDTO(process.env.USER || '', process.env.PASSWORD || '')
  }

  static createLoginWithBrokenData(): LoginDTO {
    return new LoginDTO('', '')
  }

  static createLoginWithMissingPassword(): object {
    return { username: 'testUser' }
  }

  static createLoginWithInvalidTypes(): object {
    return { username: 123, password: true }
  }
}
