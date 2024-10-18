import { userApi } from "../../../entities/UserCard"
import { useAppDispatch, useAppSelector } from "../../../app/store"
import cl from './FriendsWidget.module.scss'
import { closeFriendsWidget } from "../model/friendsWidgetSlice"
import { useClickOutside } from "../../../shared/useOutsideClick"

export const FriendsWidget = () => {

    const { user } = useAppSelector(state => state.userSlice)

    // TODO: remove myself and friends from possible friends
    const { data: possibleFriends } = userApi.useGetUsersQuery()

    const [sendFriendsRequest] = userApi.useSendFriendsRequestMutation()

    const { data: friends } = userApi.useGetFriendsQuery(user.id)

    const { isFriendsWidgetOpen } = useAppSelector(state => state.friendsWidgetSlice)

    const dispatch = useAppDispatch()

    const ref = useClickOutside(() => {
        dispatch(closeFriendsWidget())
    })

    const handleSendFriendsRequest = (friendId: number) => {
        sendFriendsRequest({
            senderId: user.id,
            receiverId: friendId
        })
    }

    return (
        <div className={`${cl.friendsWidget} ${isFriendsWidgetOpen ? cl.open : ''}`}>
            <div className={cl.friendsWidgetContent} ref={ref}>
                <button className={cl.close} onClick={() => dispatch(closeFriendsWidget())}>X</button>
                <div className={cl.fiendsWidgetInfo}>

                    <div>
                        <p>Friends</p>
                        {friends &&
                            friends.map(friend =>
                                <div className={cl.friendsWidgetRow} key={friend.id}>
                                    <p>{friend.username}</p>
                                </div>
                            )
                        }
                    </div>

                    <div className={cl.possibleFriends}>
                        <p>Possible friends</p>
                        {possibleFriends &&
                            possibleFriends.map(possibleFriend =>
                                <div className={cl.friendsWidgetRow} key={possibleFriend.id}>
                                    <p>{possibleFriend.username}</p>
                                    <button onClick={() => handleSendFriendsRequest(possibleFriend.id)}>+</button>
                                </div>
                            )
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}
