<template>
  <div class="container">
    <div class="main">
      <div class="textmain">
        <h1>Învățați orice skill doriți!</h1>
        <p>
          La BrainBuddy, credem că orice abilitate poate fi învățată — indiferent de vârstă, experiență sau domeniu.
          Vrei să faci primii pași în programare? Să comunici mai bine? Sau poate să-ți organizezi mai eficient timpul?
          Ai ajuns unde trebuie.<br />
          Platforma noastră te ajută să înveți simplu, clar și pe înțelesul tău. Alege ce te pasionează și lasă-ne
          să-ți fim partenerul de încredere în drumul spre skill-urile care contează pentru tine.
        </p>
        <NuxtLink to="/Login" class="button">Începeți acum</NuxtLink>
      </div>
      <div class="pozemain">
        <img src="/learnskills.jpg" class="imgg" height="300" width="370" />
      </div>
    </div>

    <h1 class="centered">De ce să alegi BrainBuddy?</h1>

    <div class="area2">
      <div class="optiuni">
        <img src="/manread.jpg" height="90" width="90" />
        <h3>Învățare prietenoasă, dar inteligentă</h3>
        <p>
          La BrainBuddy, învățarea devine simplă și plăcută — platforma îți oferă cursuri și materiale structurate
          clar, ca un partener de încredere care te ajută să-ți atingi obiectivele fără stres.
        </p>
      </div>
      <div class="optiuni" style="animation-delay: 1s;">
        <img src="/computerman.jpg" height="90" width="100" />
        <h3>Resurse diverse și actualizate</h3>
        <p>
          Fie că vrei să înveți programare, design, limbi străine sau dezvoltare personală, BrainBuddy îți pune la
          dispoziție conținut variat, de calitate, adaptat celor mai noi tendințe și nevoi ale pieței.
        </p>
      </div>
      <div class="optiuni" style="animation-delay: 2s;">
        <img src="/groupman.jpg" height="90" width="120" />
        <h3>Comunitate activă și suport constant</h3>
        <p>
          Nu înveți singur! BrainBuddy te conectează cu o comunitate de oameni dornici să-și împărtășească experiențe,
          iar echipa de suport este mereu gata să te ajute când ai nevoie.
        </p>
      </div>
    </div>

    <NuxtLink to="/login" class="button1">Apasă pentru a începe...</NuxtLink>

    <div class="moreinfo">
      <h1 class="white-text centered">Cine suntem noi?</h1>
      <p class="white-text">
        La BrainBuddy, credem că învățarea este cea mai puternică unealtă pentru dezvoltare personală și profesională.
        Suntem o echipă dedicată de pasionați de educație și tehnologie, care ne-am unit cu scopul de a crea o platformă
        accesibilă, prietenoasă și adaptată nevoilor fiecărui utilizator.

        Ne dorim să fim partenerul tău de încredere în călătoria de a învăța noi skill-uri, oferindu-ți resurse
        actualizate, suport constant și o comunitate activă, care să te inspire să crești mereu.

        Cu BrainBuddy, nu înveți singur — ai mereu alături un prieten care te susține să devii cea mai bună versiune a ta.
      </p>
    </div>

    <div class="lista">
      <h3>Câteva skill-uri pe care le poți învăța cu noi!</h3>
      <ul>
        <li>Cum să folosești Excel pentru început</li>
        <li>Fotografii faine cu telefonul tău</li>
        <li>Vorbit bine în fața oamenilor</li>
        <li>Economisirea banilor fără stres</li>
        <li>Gestionarea stresului și tehnici de relaxare rapide</li>
      </ul>
    </div>

    <div class="footer">
      <p class="centered">© 2025 BrainBuddy. All rights reserved.</p>
    </div>

    <!-- Forme decorative -->
    <div class="shapes">
      <div class="circle circle1"></div>
      <div class="circle circle2"></div>
      <div class="rectangle rect1"></div>
      <div class="triangle triangle1"></div>
      <div class="blob blob1"></div>
    </div>
  </div>
</template>

<script setup>
// Logică suplimentară dacă e nevoie
</script>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.main {
  flex: 6;
  display: flex;
  flex-direction: row;
}

.textmain {
  flex: 1;
  margin-left: 100px;
}

.pozemain {
  flex: 1;
  margin-left: 100px;
}

.area2 {
  display: inline-flex;
  flex: 2;
}

.optiuni {
  flex: 1;
  margin: 80px;
  height: 300px;
  width: 100px;
  margin-top: 50px;
  text-align: center;
  margin-bottom: 30px;
  animation: fadeIn 2s ease-in forwards;
  opacity: 0;
}

.moreinfo {
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #4E71FF;
  margin: 60px;
  border-radius: 20px;
  font-size: 20px;
  color: white;
}

.footer {
  margin-top: 100px;
}

h1 {
  font-weight: bold;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.button {
  display: block;
  height: 60px;
  width: 150px;
  background-color: #4E71FF;
  color: white;
  text-align: center;
  font-weight: bold;
  line-height: 60px;
  text-decoration: none;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  border-radius: 30px;
}

.button1 {
  display: block;
  height: 80px;
  width: 200px;
  background-color: white;
  color: #4E71FF;
  border: 1px solid #4E71FF;
  text-align: center;
  font-weight: bold;
  line-height: 60px;
  text-decoration: none;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  border-radius: 30px;
  margin: auto;
}

.lista {
  font-size: 20px;
  margin-left: 30px;
}

.imgg {
  border-top-right-radius: 10px;
  margin-top: 10px;
  border-right: 15px solid #4E71FF;
  border-top: 15px solid #4E71FF;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Forme decorative */
.shapes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.circle {
  position: absolute;
  border-radius: 50%;
  background-color: rgba(78, 113, 255, 0.15);
}

.circle1 {
  width: 150px;
  height: 150px;
  top: 10%;
  left: 5%;
}

.circle2 {
  width: 100px;
  height: 100px;
  bottom: 15%;
  right: 10%;
}

.rectangle {
  position: absolute;
  background-color: rgba(78, 113, 255, 0.1);
}

.rect1 {
  width: 200px;
  height: 80px;
  bottom: 10%;
  left: 10%;
  transform: rotate(10deg);
}

.triangle {
  position: absolute;
  width: 0;
  height: 0;
  border-left: 60px solid transparent;
  border-right: 60px solid transparent;
  border-bottom: 100px solid rgba(78, 113, 255, 0.2);
}

.triangle1 {
  top: 15%;
  right: 15%;
}

.blob {
  position: absolute;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle at 30% 30%, rgba(78,113,255,0.2), transparent 70%);
  border-radius: 50% 60% 40% 50% / 60% 50% 50% 40%;
  bottom: 5%;
  left: 50%;
}
</style>
