import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { GuestService } from './guest.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/roles.decorator';
import { RolesGuard } from 'src/common/roles.guard';
import { AddGuestDto } from './dto/add-guest.dto';

// @UseGuards(AuthGuard('jwt'), RolesGuard)
// @Roles('resident')
@Controller('guest')
export class GuestController {
  constructor(private readonly guestService: GuestService) {}

  @Get()
  async getAllGuests(@Query('userid') userid: string) {
    return await this.guestService.getGuestsWithVehicleInfo(userid);
  }

  @Get('all')
  async getAllAndEveryGuest() {
    return await this.guestService.getAllGuestsWithVehicleInfo();
  }

  @Post('register')
  async registerGuest(
    @Req() req: { user: { userid: string } },
    @Body() dto: AddGuestDto,
  ) {
    const userId = req.user.userid;
    return await this.guestService.addGuest(dto, userId);
  }

  @Post('verify')
  async verifyGuest(@Body() dto: { guestId: string }) {
    const { guestId } = dto;
    return await this.guestService.verifyGuest(guestId);
  }
}
