# Taxi Queue App

## Features of the Widget
The widget should manage two queues:
1. **People Queue**: Tracks the number of people waiting for a taxi.
2. **Taxi Queue**: Tracks the number of taxis available.

### Operations
1. **People Joining the Queue**:  
   - Add 1 to the **People Queue**.

2. **People Leaving the Queue**:  
   - Remove 1 from the **People Queue**.

3. **Taxis Joining the Queue**:  
   - Add 1 to the **Taxi Queue**.

4. **Taxis Leaving the Queue**:  
   - Remove 1 from the **Taxi Queue**.  
   - Remove 12 people from the **People Queue**.  
   - A taxi can only leave if there are at least 12 people in the **People Queue**.



## Notes
- Ensure that the app maintains the conditions for a taxi departure.
- Handle edge cases like attempting to remove a person or taxi when the respective queues are empty.
- Extend functionality as needed for a larger system.
