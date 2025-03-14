import { Injectable } from '@nestjs/common';

@Injectable()
export class DummyService {
  public work(): string {
    return 'Dummy Services Return';
  }
}
