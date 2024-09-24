"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDto = void 0;
class UserDto {
    constructor(model) {
        this.email = model.email;
        this.username = model.username;
        this.id = model.id;
        this.isActivated = model.is_activated;
    }
}
exports.UserDto = UserDto;
//# sourceMappingURL=userDto.js.map