import { pool } from "../config/dbConfig"
import { ApiError } from "../exceptions/apiError"

interface IUser {
    id: number,
    username: string
}

class UserService {

    async getUsers() {

        const result = await pool.query('SELECT * FROM person')

        const users = result.rows.map(user => {
            return {
                id: user.id,
                username: user.username,
            } as IUser
        })

        return users
    }

    async getPossibleFriends(userId: number) {

        const friends = await this.getFriends(userId)

        const users = await this.getUsers()

        const possibleFriends = users.filter(user => user.id !== userId).filter(user => {

            if (friends.find(friend => friend.id === user.id)) {
                return 
            }

            return user
        })

        return possibleFriends

    }

    async sendFriendsRequest(senderId: number, receiverId: number) {

        console.log('senderId ', senderId)
        console.log('receiverId ', receiverId)

        if (senderId === receiverId) {
            console.log('error 1')
            throw ApiError.BadRequest('You cannot send friend request to yourself')
        }

        const friendshipCandidate1 = await pool.query('SELECT * FROM friends WHERE user1_id = $1 AND user2_id = $2', [senderId, receiverId])
        const friendshipCandidate2 = await pool.query('SELECT * FROM friends WHERE user1_id = $1 AND user2_id = $2', [receiverId, senderId])

        console.log('friendshipCandidate1 ', friendshipCandidate1.rows)
        console.log('friendshipCandidate2 ', friendshipCandidate2.rows)

        friendshipCandidate1.rows.sort()
        friendshipCandidate2.rows.sort()

        if (friendshipCandidate1.rows.length > 0 || friendshipCandidate2.rows.length > 0) {
            if (friendshipCandidate1.rows[0] === friendshipCandidate2.rows[0] ||
                friendshipCandidate1.rows[1] === friendshipCandidate2.rows[1]) {
                console.log('error 3')
                throw ApiError.BadRequest('You already sent friend request')
            }
        }

        await pool.query('INSERT INTO friends (user1_id, user2_id) VALUES ($1, $2) RETURNING *', [senderId, receiverId])

    }

    async getFriends(userId: number) {

        const friendships = (await pool.query('SELECT * FROM friends WHERE user1_id = $1 OR user2_id = $1', [userId])).rows

        const friendsIds: number[] = friendships.map(friendship => {
            if (friendship.user1_id === userId) {
                return friendship.user2_id
            } else {
                return friendship.user1_id
            }
        })

        const result = await pool.query('SELECT * FROM person WHERE id = ANY($1)', [friendsIds])

        const friendsList = result.rows.map(user => {
            return {
                id: user.id,
                username: user.username,
            } as IUser
        })

        return friendsList

    }

    async deleteFriendship(userId: number, friendId: number) {
        await pool.query('DELETE FROM friends WHERE (user1_id = $1 AND user2_id = $2) OR (user1_id = $2 AND user2_id = $1)', [userId, friendId])
    }
}

export const userService = new UserService()