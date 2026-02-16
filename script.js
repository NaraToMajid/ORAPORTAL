// ========== SUPABASE CONFIG ==========
const supabaseUrl = 'https://bxhrnnwfqlsoviysqcdw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4aHJubndmcWxzb3ZpeXNxY2R3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3ODkzNDIsImV4cCI6MjA4MTM2NTM0Mn0.O7fpv0TrDd-8ZE3Z9B5zWyAuWROPis5GRnKMxmqncX8';

const supabaseClient = supabase.createClient(supabaseUrl, supabaseAnonKey);

// ========== PASSWORD ==========
const CORRECT_PASSWORD = 'Rantauprapat123';

// ========== DATA ==========
let profileData = {
    name: 'TRAINER RED',
    image_url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
};

let links = [];
let galleryIds = [25, 1, 4, 7, 6, 149, 143, 94, 133, 150];

// ========== FUNGSI RANDOM UNIK ==========
function getRandomUniquePokemon(existingIds, count = 1) {
    const newIds = [];
    const availableIds = Array.from({ length: 151 }, (_, i) => i + 1);
    const usedIds = new Set(existingIds);
    
    for (let i = 0; i < count; i++) {
        const possibleIds = availableIds.filter(id => !usedIds.has(id) && !newIds.includes(id));
        if (possibleIds.length === 0) break;
        
        const randomId = possibleIds[Math.floor(Math.random() * possibleIds.length)];
        newIds.push(randomId);
        usedIds.add(randomId);
    }
    
    return newIds;
}

// ========== LOAD DATA ==========
async function loadData() {
    try {
        // Load profile
        const { data: profile, error: profileError } = await supabaseClient
            .from('portal_profile')
            .select('*')
            .eq('id', 1)
            .single();

        if (profile) {
            profileData = profile;
            document.getElementById('profileTag').innerText = profile.name;
            document.getElementById('profileImg').src = profile.image_url || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png';
            document.getElementById('editProfilePreview').src = profile.image_url || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png';
        }

        // Load links
        const { data: linksData, error: linksError } = await supabaseClient
            .from('portal_links')
            .select('*')
            .order('position', { ascending: true });

        if (linksData && linksData.length > 0) {
            links = linksData;
        } else {
            // Default links
            links = [
                { text: 'BATTLE TOWER', url: '#', pokemon_id: 6, position: 1 },
                { text: 'POKEDEX', url: '#', pokemon_id: 1, position: 2 },
                { text: 'HALL OF FAME', url: '#', pokemon_id: 149, position: 3 },
                { text: 'CONTACT', url: '#', pokemon_id: 25, position: 4 }
            ];
        }
        renderLinks();

        // Load gallery
        const { data: galleryData, error: galleryError } = await supabaseClient
            .from('portal_gallery')
            .select('*')
            .order('position', { ascending: true });

        if (galleryData && galleryData.length > 0) {
            galleryIds = galleryData.map(g => g.pokemon_id);
        }
        renderGallery();

    } catch (error) {
        console.error('Error loading data:', error);
        renderLinks();
    }
}

// ========== RENDER LINK ==========
function renderLinks() {
    const panel = document.getElementById('linksPanel');
    if (!links || links.length === 0) {
        panel.innerHTML = '<div class="loading">BELUM ADA LINK</div>';
        return;
    }
    
    panel.innerHTML = '';
    links.sort((a, b) => (a.position || 0) - (b.position || 0));
    
    // Cek duplikat pokemon_id
    const usedPokemon = new Set();
    const uniqueLinks = [];
    
    links.forEach(link => {
        if (!usedPokemon.has(link.pokemon_id)) {
            usedPokemon.add(link.pokemon_id);
            uniqueLinks.push(link);
        }
    });
    
    uniqueLinks.forEach((link, idx) => {
        const number = idx + 1;
        const card = document.createElement('a');
        card.href = link.url || '#';
        card.className = 'link-card';
        card.target = "_blank";
        card.rel = "noopener";
        
        card.innerHTML = `
            <div class="link-number">#${number}</div>
            <span class="link-text">${link.text || 'LINK'}</span>
            <img class="link-pokemon-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${link.pokemon_id || 25}.png" alt="pokemon">
        `;
        panel.appendChild(card);
    });
    
    // Update links dengan yang unik
    links = uniqueLinks;
}

// ========== RENDER GALLERY ==========
async function renderGallery() {
    const gallery = document.getElementById('pokemonGallery');
    gallery.innerHTML = '<div class="loading">MEMUAT POKEMON...</div>';
    
    // Hapus duplikat dari gallery
    galleryIds = [...new Set(galleryIds)];
    
    const promises = galleryIds.map(async (id) => {
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            return await res.json();
        } catch {
            return null;
        }
    });

    const results = await Promise.all(promises);
    gallery.innerHTML = '';
    
    results.forEach((data, index) => {
        if (!data) return;
        const id = galleryIds[index];
        const card = document.createElement('div');
        card.className = 'poke-card';
        card.style.setProperty('--r', (Math.random()*4-2) + 'deg');
        card.innerHTML = `
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="${data.name}">
            <div class="name">${data.name.toUpperCase()}</div>
            <div class="number">#${id.toString().padStart(3,'0')}</div>
        `;
        card.onclick = () => {
            const newIds = getRandomUniquePokemon(galleryIds, 1);
            if (newIds.length > 0) {
                galleryIds[index] = newIds[0];
                renderGallery();
            } else {
                alert('Semua Pokemon sudah ada!');
            }
        };
        gallery.appendChild(card);
    });
}

// ========== RENDER LINK EDIT ==========
function renderLinkEdit() {
    const container = document.getElementById('linkEditContainer');
    container.innerHTML = '';
    
    links.sort((a, b) => (a.position || 0) - (b.position || 0));
    
    // Cek duplikat untuk edit
    const usedPokemon = new Set();
    
    links.forEach((link, index) => {
        const item = document.createElement('div');
        item.className = 'link-edit-item';
        item.innerHTML = `
            <input type="text" value="${link.text || ''}" placeholder="judul" id="linkText${index}">
            <input type="text" value="${link.url || ''}" placeholder="URL" id="linkUrl${index}">
            <input type="number" value="${link.pokemon_id || 25}" placeholder="Pokemon ID" id="linkPokemon${index}" min="1" max="898" style="width:100px;">
            <button class="deleteLinkBtn" data-index="${index}">HAPUS</button>
        `;
        container.appendChild(item);
    });

    document.querySelectorAll('.deleteLinkBtn').forEach(btn => {
        btn.onclick = (e) => {
            const idx = e.target.dataset.index;
            links.splice(idx, 1);
            renderLinkEdit();
        };
    });
}

// ========== RENDER GALLERY EDIT ==========
function renderGalleryEdit() {
    const grid = document.getElementById('galleryEditGrid');
    grid.innerHTML = '';
    
    // Hapus duplikat
    galleryIds = [...new Set(galleryIds)];
    
    galleryIds.forEach((id, idx) => {
        const img = document.createElement('img');
        img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
        img.onclick = () => {
            galleryIds.splice(idx, 1);
            renderGalleryEdit();
            renderGallery();
        };
        grid.appendChild(img);
    });
}

// ========== UPLOAD FOTO PROFIL ==========
async function uploadProfileImage(file) {
    const fileName = `profile_${Date.now()}.png`;
    const { data, error } = await supabaseClient.storage
        .from('portal_images')
        .upload(fileName, file);

    if (error) {
        alert('Gagal upload: ' + error.message);
        return;
    }

    const { data: { publicUrl } } = supabaseClient.storage
        .from('portal_images')
        .getPublicUrl(fileName);

    // Update preview
    document.getElementById('editProfilePreview').src = publicUrl;
    profileData.image_url = publicUrl;
}

// ========== SAVE TO SUPABASE ==========
async function saveToSupabase() {
    try {
        // Save profile with new name
        const newName = document.getElementById('editTrainerName').value;
        
        const { error: profileError } = await supabaseClient
            .from('portal_profile')
            .upsert({ 
                id: 1, 
                name: newName,
                image_url: profileData.image_url 
            });

        if (profileError) throw profileError;

        // Update tampilan profil
        document.getElementById('profileTag').innerText = newName;
        if (profileData.image_url) {
            document.getElementById('profileImg').src = profileData.image_url;
        }

        // Save links
        await supabaseClient.from('portal_links').delete().neq('id', 0);
        
        const newLinks = [];
        const usedPokemon = new Set();
        
        for (let i = 0; i < links.length; i++) {
            const textInput = document.getElementById(`linkText${i}`);
            const urlInput = document.getElementById(`linkUrl${i}`);
            const pokemonInput = document.getElementById(`linkPokemon${i}`);
            
            if (textInput && urlInput) {
                const pokemonId = parseInt(pokemonInput?.value) || 25;
                
                // Cek duplikat
                if (!usedPokemon.has(pokemonId)) {
                    usedPokemon.add(pokemonId);
                    newLinks.push({
                        text: textInput.value,
                        url: urlInput.value || '#',
                        pokemon_id: pokemonId,
                        position: i
                    });
                }
            }
        }
        
        if (newLinks.length > 0) {
            const { error: linksError } = await supabaseClient.from('portal_links').insert(newLinks);
            if (linksError) throw linksError;
        }
        links = newLinks;

        // Save gallery
        await supabaseClient.from('portal_gallery').delete().neq('id', 0);
        
        // Hapus duplikat dari gallery
        const uniqueGalleryIds = [...new Set(galleryIds)];
        const galleryData = uniqueGalleryIds.map((id, index) => ({
            pokemon_id: id,
            position: index
        }));
        
        if (galleryData.length > 0) {
            const { error: galleryError } = await supabaseClient.from('portal_gallery').insert(galleryData);
            if (galleryError) throw galleryError;
        }
        
        galleryIds = uniqueGalleryIds;

        alert('Data berhasil disimpan!');
        renderLinks();
        renderGallery();
        
    } catch (error) {
        console.error('Save error:', error);
        alert('Gagal menyimpan: ' + error.message);
    }
}

// ========== PASSWORD HANDLER ==========
function checkPassword() {
    const password = document.getElementById('passwordInput').value;
    if (password === CORRECT_PASSWORD) {
        document.getElementById('passwordModal').classList.remove('open');
        document.getElementById('editTrainerName').value = profileData.name;
        document.getElementById('editProfilePreview').src = profileData.image_url;
        renderLinkEdit();
        renderGalleryEdit();
        document.getElementById('editScreen').classList.add('open');
    } else {
        alert('Password salah!');
    }
    document.getElementById('passwordInput').value = '';
}

// ========== EVENT LISTENERS ==========
document.addEventListener('DOMContentLoaded', function() {
    // Night mode toggle
    document.getElementById('nightToggleBtn').addEventListener('click', function() {
        document.body.classList.toggle('night');
        this.innerText = document.body.classList.contains('night') ? 'SIANG' : 'MALAM';
    });

    // Edit button - buka password modal
    document.getElementById('editOpenBtn').addEventListener('click', function() {
        document.getElementById('passwordModal').classList.add('open');
    });

    // Password submit
    document.getElementById('submitPassword').addEventListener('click', checkPassword);
    
    document.getElementById('passwordInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') checkPassword();
    });

    document.getElementById('cancelPassword').addEventListener('click', function() {
        document.getElementById('passwordModal').classList.remove('open');
        document.getElementById('passwordInput').value = '';
    });

    // Upload foto di edit
    document.getElementById('editUploadBtn').addEventListener('click', function() {
        document.getElementById('editFileUpload').click();
    });

    document.getElementById('editFileUpload').addEventListener('change', function(e) {
        if (e.target.files[0]) {
            uploadProfileImage(e.target.files[0]);
        }
    });

    // Close edit
    document.getElementById('closeEditBtn').addEventListener('click', function() {
        document.getElementById('editScreen').classList.remove('open');
    });

    // Add link
    document.getElementById('addLinkBtn').addEventListener('click', function() {
        // Cari pokemon ID yang belum dipakai
        const usedIds = links.map(l => l.pokemon_id);
        const newIds = getRandomUniquePokemon(usedIds, 1);
        const newId = newIds.length > 0 ? newIds[0] : 132;
        
        links.push({ text: 'LINK BARU', url: '#', pokemon_id: newId });
        renderLinkEdit();
    });

    // Add pokemon
    document.getElementById('addPokemonBtn').addEventListener('click', function() {
        const newIds = getRandomUniquePokemon(galleryIds, 3);
        if (newIds.length > 0) {
            galleryIds.push(...newIds);
            renderGalleryEdit();
            renderGallery();
        } else {
            alert('Semua Pokemon (1-151) sudah ada di gallery!');
        }
    });

    // Sync pokemon
    document.getElementById('syncPokemonBtn').addEventListener('click', function() {
        const newIds = getRandomUniquePokemon(galleryIds, 5);
        if (newIds.length > 0) {
            galleryIds.push(...newIds);
            renderGalleryEdit();
            renderGallery();
        } else {
            alert('Semua Pokemon (1-151) sudah ada di gallery!');
        }
    });

    // Save edit
    document.getElementById('saveEditBtn').addEventListener('click', async function() {
        await saveToSupabase();
        document.getElementById('editScreen').classList.remove('open');
    });

    // ========== INIT ==========
    // Buat awan
    const cloudLayer = document.getElementById('cloudLayer');
    for (let i = 0; i < 6; i++) {
        let cloud = document.createElement('div');
        cloud.className = 'cloud';
        cloud.style.top = (20 + i * 45) + 'px';
        cloud.style.animation = `cloudmove ${20 + i*3}s linear infinite`;
        cloud.style.animationDelay = -(i * 4) + 's';
        cloud.style.left = -(50 + i * 30) + 'px';
        cloudLayer.appendChild(cloud);
    }

    // Buat bintang
    const starsDiv = document.getElementById('starField');
    for (let i=0; i<60; i++) {
        let s = document.createElement('div');
        s.className = 'star';
        s.style.left = Math.random()*100 + '%';
        s.style.top = Math.random()*70 + '%';
        s.style.animationDelay = Math.random()*3 + 's';
        starsDiv.appendChild(s);
    }

    // Load data
    loadData();
});
