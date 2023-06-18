<template>
    <div class="auth-container">
        <div class="row form-header">
            <img src="" alt="" class="form-logo">
            <h3 class="">Create an account</h3>
        </div>

        <div class="form-container">
            <label for="email address">Email Address</label>
            <input type="email" id="email address" placeholder="Email Address">
        </div>
        <div class="form-container">
            <label for="email address">Username</label>
            <input type="text" id="name" placeholder="Username">
        </div>

        <div class="form-container">
            <label for="password">Password</label>
            <input type="password" id="password" placeholder="Password">
        </div>
        <div class="form-container">
            <label for="password">Confirm Password</label>
            <input type="password" id="password" placeholder="Confirm Password">
        </div>

        <div class="form-container">
            <button type="submit">Create Account</button>
        </div>

        <div class="form-footer">
            <p>Have an account? <router-link :to="{ name: 'login' }">Login</router-link></p>
        </div>
    </div>
</template>

