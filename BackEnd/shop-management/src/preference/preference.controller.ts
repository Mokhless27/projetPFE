import {
  Controller,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Patch,
  Put,
} from '@nestjs/common';
import { PreferenceService } from './preference.service';
import { CreatePreferenceDto } from './dto/create-preference.dto';
import { Preference } from './preference.entity';
import { AuthService } from 'src/auth/auth.service';

@Controller('preference')
export class PreferenceController {
  constructor(
    private preferenceService: PreferenceService,
    private authService: AuthService,
  ) {}
  @Post('/:idU')
  async create(
    @Param('idU', ParseIntPipe) idU: number,
    @Body() createPreferenceDto: CreatePreferenceDto,
  ): Promise<Preference> {
    const user = await this.authService.getUserById(idU);
    //console.log(user);
    return this.preferenceService.createPreference(user, createPreferenceDto);
  }

  @Put('/:idP')
  async updatePref(
    @Param('idP', ParseIntPipe) idP: number,
    @Body() createPreferenceDto: CreatePreferenceDto,
  ): Promise<Preference> {
    return this.preferenceService.updatePref(idP, createPreferenceDto);
  }
}
