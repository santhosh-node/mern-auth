import { ApiResponse, asyncHandler } from '../../shared/utils/api';
import { SessionValidator } from '../validators/session';
import { SessionService } from '../services/session';

export class SessionController {
  constructor(
    private readonly validator: SessionValidator,
    private readonly service: SessionService
  ) {}

  getSessionsByUserId = asyncHandler(async (req, res) => {
    const result = await this.service.getSessionsByUserId(req?.user?.id);
    ApiResponse.sendSuccess(res, { data: result, message: 'Sessions fetched successfully' });
  });

  deleteSessionById = asyncHandler(async (req, res) => {
    const result = await this.service.deleteSessionById(req.params.id);
    ApiResponse.sendSuccess(res, { data: result, message: 'Session deleted successfully' });
  });
}
