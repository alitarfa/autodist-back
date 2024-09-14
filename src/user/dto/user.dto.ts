import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    description: 'Unique identifier of the user',
    example: '1',
  })
  _id: string;

  @ApiProperty({
    description: 'Name of the user',
    example: 'Julien Hero',
  })
  name: string;

  @ApiProperty({
    description: 'Email of the user',
    example: 'julien.hero@coding-way.com',
  })
  email: string;
}
