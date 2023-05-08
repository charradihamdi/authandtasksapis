"use strict";
exports.__esModule = true;
exports.apiTokenCheck = void 0;
var common_1 = require("@nestjs/common");
var apiTokenCheck = /** @class */ (function () {
    function apiTokenCheck(jwtService) {
        this.jwtService = jwtService;
    }
    apiTokenCheck.prototype.use = function (req, res, next) {
        try {
            var token = this.extractTokenFromHeader(req);
            var check = this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET
            });
            console.log(check);
        }
        catch (error) {
            throw new common_1.BadRequestException('invalid token ');
        }
        next();
    };
    apiTokenCheck.prototype.extractTokenFromHeader = function (request) {
        var _a, _b;
        var _c = (_b = (_a = request.headers['token']) === null || _a === void 0 ? void 0 : _a.split(' ')) !== null && _b !== void 0 ? _b : [], type = _c[0], token = _c[1];
        //  console.log(type, 'token', token);
        return type === 'Bearer' ? token : undefined;
    };
    return apiTokenCheck;
}());
exports.apiTokenCheck = apiTokenCheck;
