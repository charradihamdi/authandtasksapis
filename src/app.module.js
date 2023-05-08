"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var mongoose_1 = require("@nestjs/mongoose");
var auth_module_1 = require("./auth/auth.module");
var cats_module_1 = require("./cats/cats.module");
var cats_controller_1 = require("./cats/cats.controller");
var tasks_module_1 = require("./tasks/tasks.module");
var tesks_1 = require("./tesks/tesks");
var token_Middlware_1 = require("./middlware/token.Middlware");
var configurations_1 = require("./config/configurations");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule.prototype.configure = function (consumer) {
        consumer
            .apply(token_Middlware_1.apiTokenCheck)
            //*.exclude({path:'cats',method : RequestMethod.GET})
            .forRoutes({ path: '*', method: common_1.RequestMethod.ALL }, cats_controller_1.CatsController);
    };
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                config_1.ConfigModule.forRoot({
                    envFilePath: '.env',
                    isGlobal: true,
                    load: [configurations_1["default"]]
                }),
                mongoose_1.MongooseModule.forRoot(process.env.DB_URI),
                auth_module_1.AuthModule,
                cats_module_1.CatsModule,
                tasks_module_1.TasksModule,
            ],
            providers: [tesks_1.Tesks]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
