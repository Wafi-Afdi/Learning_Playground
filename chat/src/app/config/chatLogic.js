export function isFromAdmin (data, user) {
    if (user.admin && data.sender.admin) {
        // if message is from admin and user is admin
        return true
    
    // user is not admin and message is not from admin
    } else return false;
} 

export function isFromYou (data, user) {
    if (user.id === data.sender._id) {
        // if message is from you
        return true
    
    // user is not admin and message is not from admin
    } else return false;
} 