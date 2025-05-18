import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/roles.decorator';
import { RolesGuard } from 'src/common/roles.guard';
import { AddVehicleDto } from './dto/add-vehicle.dto';

// @UseGuards(AuthGuard('jwt'), RolesGuard)
// @Roles('resident')
@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post('add')
  async addVehicle(
    @Body() dto: AddVehicleDto,
    @Req() req: { user: { userid: string } },
  ) {
    return this.vehicleService.addVehicle(dto, req.user.userid);
  }

  @Get()
  async getAllVehiclesByUserId(@Query('userid') userid: string) {
    return this.vehicleService.getAllVehiclesByUserId(userid);
  }

  @Get('all')
  async allVehicles() {
    return this.vehicleService.getAllVehicles();
  }
}
