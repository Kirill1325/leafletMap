"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const dbConfig_1 = require("../config/dbConfig");
const apiError_1 = require("../exceptions/apiError");
class UserService {
    async getUsers() {
        const result = await dbConfig_1.pool.query('SELECT * FROM person');
        const users = result.rows.map(user => {
            return {
                id: user.id,
                username: user.username,
            };
        });
        return users;
    }
    async getPossibleFriends(userId) {
        const friends = await this.getFriends(userId);
        const users = await this.getUsers();
        const possibleFriends = users.filter(user => user.id !== userId).filter(user => {
            if (friends.find(friend => friend.id === user.id)) {
                return;
            }
            return user;
        });
        return possibleFriends;
    }
    async sendFriendsRequest(senderId, receiverId) {
        console.log('senderId ', senderId);
        console.log('receiverId ', receiverId);
        if (senderId === receiverId) {
            console.log('error 1');
            throw apiError_1.ApiError.BadRequest('You cannot send friend request to yourself');
        }
        const friendshipCandidate1 = await dbConfig_1.pool.query('SELECT * FROM friends WHERE user1_id = $1 AND user2_id = $2', [senderId, receiverId]);
        const friendshipCandidate2 = await dbConfig_1.pool.query('SELECT * FROM friends WHERE user1_id = $1 AND user2_id = $2', [receiverId, senderId]);
        console.log('friendshipCandidate1 ', friendshipCandidate1.rows);
        console.log('friendshipCandidate2 ', friendshipCandidate2.rows);
        friendshipCandidate1.rows.sort();
        friendshipCandidate2.rows.sort();
        if (friendshipCandidate1.rows.length > 0 || friendshipCandidate2.rows.length > 0) {
            if (friendshipCandidate1.rows[0] === friendshipCandidate2.rows[0] ||
                friendshipCandidate1.rows[1] === friendshipCandidate2.rows[1]) {
                console.log('error 3');
                throw apiError_1.ApiError.BadRequest('You already sent friend request');
            }
        }
        await dbConfig_1.pool.query('INSERT INTO friends (user1_id, user2_id) VALUES ($1, $2) RETURNING *', [senderId, receiverId]);
    }
    async getFriends(userId) {
        const friendships = (await dbConfig_1.pool.query('SELECT * FROM friends WHERE user1_id = $1 OR user2_id = $1', [userId])).rows;
        const friendsIds = friendships.map(friendship => {
            if (friendship.user1_id === userId) {
                return friendship.user2_id;
            }
            else {
                return friendship.user1_id;
            }
        });
        const result = await dbConfig_1.pool.query('SELECT * FROM person WHERE id = ANY($1)', [friendsIds]);
        const friendsList = result.rows.map(user => {
            return {
                id: user.id,
                username: user.username,
            };
        });
        return friendsList;
    }
    async deleteFriendship(userId, friendId) {
        await dbConfig_1.pool.query('DELETE FROM friends WHERE (user1_id = $1 AND user2_id = $2) OR (user1_id = $2 AND user2_id = $1)', [userId, friendId]);
    }
}
exports.userService = new UserService();
//# sourceMappingURL=userService.js.map