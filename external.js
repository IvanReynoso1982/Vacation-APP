function setHandlers() {
    document.getElementById("member-Ivan").addEventListener("click", function() {
        if (document.querySelector("input[id=member-Ivan").checked) {
            document.getElementById("member-info-Ivan").style.display = "block";
        } else {
            document.getElementById("member-info-Ivan").style.display = "none";
        }
    })
    document.getElementById("member-Justin").addEventListener("click", function() {
        if (document.querySelector("input[id=member-Justin").checked) {
            document.getElementById("member-info-Justin").style.display = "block";
        } else {
            document.getElementById("member-info-Justin").style.display = "none";
        }
    })
    document.getElementById("member-Dan").addEventListener("click", function() {
        if (document.querySelector("input[id=member-Dan").checked) {
            document.getElementById("member-info-Dan").style.display = "block";
        } else {
            document.getElementById("member-info-Dan").style.display = "none";
        }
    })
    document.getElementById("member-Michael").addEventListener("click", function() {
        if (document.querySelector("input[id=member-Michael").checked) {
            document.getElementById("member-info-Michael").style.display = "block";
        } else {
            document.getElementById("member-info-Michael").style.display = "none";
        }
    })
    document.getElementById("member-info-Ivan").style.display = "none";
    document.getElementById("member-info-Justin").style.display = "none";
    document.getElementById("member-info-Dan").style.display = "none";
    document.getElementById("member-info-Michael").style.display = "none";

    document.getElementById("red").addEventListener("click", function() {
        document.getElementById("member-info-Ivan").style.color = "red";
        document.getElementById("member-info-Justin").style.color = "red";
        document.getElementById("member-info-Dan").style.color = "red";
        document.getElementById("member-info-Michael").style.color = "red";
        document.getElementById("ijdmAbout").style.color = "red";
    })
    document.getElementById("green").addEventListener("click", function() {
        document.getElementById("member-info-Ivan").style.color = "green";
        document.getElementById("member-info-Justin").style.color = "green";
        document.getElementById("member-info-Dan").style.color = "green";
        document.getElementById("member-info-Michael").style.color = "green";
        document.getElementById("ijdmAbout").style.color = "green";
    })
    document.getElementById("blue").addEventListener("click", function() {
        document.getElementById("member-info-Ivan").style.color = "blue";
        document.getElementById("member-info-Justin").style.color = "blue";
        document.getElementById("member-info-Dan").style.color = "blue";
        document.getElementById("member-info-Michael").style.color = "blue";
        document.getElementById("ijdmAbout").style.color = "blue";
    })
}

function clearForm() {
    const form = document.querySelector('form');
    document.getElementById("submissionText").innerText="";
    form.reset();
}