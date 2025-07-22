# In-app Payment

## Priority: High  
Secure payment system for user convenience.

## Estimation: 3 days  
- **Sungha:** 2 days  
- **Mi-La:** 3 days  
- **Yu-Yang:** 3 days

## Assumptions  
- Users prefer digital payment over cash.  
- Stripe is used as the primary payment gateway.  
- Users are logged in and have a valid booking.

## Description  
**v1:** As a customer, I want to pay for cleaning services directly in the app using card or PayNow so that I don’t need to handle cash.  

**v2:** As a user, I want to pay for cleaning services directly through the app so that I don’t have to handle cash transactions. The system should support secure and seamless in-app payments, including integration with commonly used payment methods such as credit/debit cards, mobile wallets (e.g., Apple Pay, Google Pay), and PayNow. Users should be able to view payment confirmation, track transaction history, and receive digital receipts. The system must ensure encryption and compliance with relevant financial regulations to protect user data. 

## Tasks  
- [x] Integrate payment gateway (Stripe) – 2 days  
- [x] Secure transaction setup and redirection – 1 day  

## UI Design (Mockup)  
- Includes payment confirmation screen and redirection.  
- 🔗 [View Mockup](https://ninjamock.com/s/XRNN7Lx)

## Completed  
- ✅ All tasks were implemented by **Sungha (SH)**  
- ✅ Stripe checkout integrated with dynamic price ID  
- ✅ Booking details and payment linked via Firestore `bookingId`

### Screenshots  
> *(Replace with actual paths in your GitHub repo)*

<img width="1736" height="925" alt="스크린샷 2025-07-23 04 08 58" src="https://github.com/user-attachments/assets/2706fef0-982c-494a-a283-81165345d444" />
<img width="1456" height="796" alt="스크린샷 2025-07-23 04 09 33" src="https://github.com/user-attachments/assets/7018d808-aff9-49d3-99b2-b9425796ed5b" />
