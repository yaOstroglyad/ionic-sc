/**
 * Title
 * 1-eSIM self-care API Specification
 *
 * The version of the OpenAPI document: 1.0.0
 */

export interface SubscriberInfo {
    /**
     * Unique identifier of the subscriber
     */
    id: string;
    /**
     * Unique identifier of the offer
     */
    offerId: string;
    /**
     * ICCID of the subscriber
     */
    iccid: string;
    /**
     * Login name of the subscriber
     */
    loginName: string;
    /**
     * Password of the subscriber
     */
    password: string;
    /**
     * Email of the subscriber
     */
    email?: string;
    /**
     * Phone number of the subscriber
     */
    phoneNumber: string;
    /**
     * First name of the subscriber
     */
    firstName?: string;
    /**
     * Last name of the subscriber
     */
    lastName?: string;
}

