
        let heartCount = 0;
        let coinCount = 100;
        let copyCount = 0;

        const heartCountEl = document.getElementById('heart-count');
        const coinCountEl = document.getElementById('coin-count');
        const copyCountEl = document.getElementById('copy-count');
        const callHistoryList = document.querySelector('.call-history-list');
        const emptyHistory = document.getElementById('empty-history');

        function getCurrentTime() {
            const now = new Date();
            let h = now.getHours();
            const m = now.getMinutes().toString().padStart(2, '0');
            const s = now.getSeconds().toString().padStart(2, '0');
            const ampm = h >= 12 ? 'PM' : 'AM';
            h = h % 12 || 12;
            return `${h}:${m}:${s} ${ampm}`;
        }

        function updateEmptyHistoryVisibility() {
            const hasHistory = callHistoryList.children.length > 0;
            emptyHistory.style.display = hasHistory ? 'none' : 'block';
        }

        // Copy button functionality
        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const card = this.closest('.hotline-card');
                const number = card.querySelector('.card-number').textContent;
           
                navigator.clipboard.writeText(number);
                
                copyCount++;
                document.getElementById('copy-count-btn').textContent = copyCount + ' Copy';
                
                alert(`Number ${number} copied to clipboard!`);
                
                this.textContent = 'Copied!';
                
            });
        });
        // CALL button functionality
        document.querySelectorAll('.call-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const card = this.closest('.hotline-card');
                const name = card.querySelector('h3').textContent;
                const number = card.querySelector('.card-number').textContent;

                if (coinCount < 20) {
                    alert('Not enough coins to make a call!');
                    return;
                }

                coinCount -= 20;
                coinCountEl.textContent = coinCount;

                alert(`Calling ${name} at ${number}`);

                const li = document.createElement('li');
                li.className = 'flex justify-between items-start bg-gray-50 p-3 rounded-lg';
                li.innerHTML = `
                    <div>
                        <div class="font-semibold text-sm text-gray-800">${name}</div>
                        <div class="text-gray-600 text-sm">${number}</div>
                    </div>
                    <div class="call-time text-xs text-gray-500 mt-1">${getCurrentTime()}</div>
                `;
                callHistoryList.prepend(li);
                updateEmptyHistoryVisibility();
            });
        });

        // Heart button functionality
        document.querySelectorAll('.fav-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const heartIcon = this.querySelector('.heart-icon');

                if (!this.classList.contains('active')) {  
                    heartCount++;
                    heartCountEl.textContent = heartCount;
                    heartIcon.className = 'fas fa-heart heart-icon text-red-500';
                    this.classList.add('active');
                } else {
                    heartCount--;
                    heartCountEl.textContent = heartCount;
                    heartIcon.className = 'far fa-heart heart-icon text-gray-300';
                    this.classList.remove('active');
                }
            });
        });

        // Clear history functionality
        document.querySelector('.clear-history-btn').addEventListener('click', () => {
            callHistoryList.innerHTML = '';
            updateEmptyHistoryVisibility();
        });

        updateEmptyHistoryVisibility();
